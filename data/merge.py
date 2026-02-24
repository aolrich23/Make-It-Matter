import json
import os
import sys
from typing import List, Dict, Any

# Ensure we can import transformers from the local directory
sys.path.append(os.path.dirname(__file__))

from manual import ManualTransformer
from sewforcharity import SewForCharityTransformer
# Import other transformers here as you add them

# --- Configuration ---
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
SOURCES_DIR = os.path.join(DATA_DIR, 'sources')
OUTPUT_FILE = os.path.join(DATA_DIR, 'projects.json')

# Register active transformers here
# Order matters: Later sources can overwrite earlier ones if duplicates exist
TRANSFORMERS = [
    ManualTransformer(),
    SewForCharityTransformer(),
]

def load_source_data(filename: str) -> List[Dict[str, Any]]:
    filepath = os.path.join(SOURCES_DIR, filename)
    if not os.path.exists(filepath):
        print(f"⚠️  Source file not found: {filename}")
        return []
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        print(f"❌ Error decoding JSON from {filename}: {e}")
        return []

def get_unique_key(project: Dict[str, Any]) -> str:
    """
    Generates a deterministic unique key for deduplication.
    Key: (slugified title) + (slugified organiser name)
    """
    title = project.get('title', '').lower().strip()
    organiser = project.get('organiser', {}).get('name', '').lower().strip()
    return f"{title}|{organiser}"

def validate_schema(project: Dict[str, Any]) -> bool:
    """
    Basic schema validation to ensure required fields exist.
    """
    required_fields = ['title', 'description', 'organiser', 'category', 'craft', 'materials']
    for field in required_fields:
        if field not in project or not project[field]:
            return False
    return True

def main():
    print(f"🚀 Starting merge process...")
    
    all_projects_map: Dict[str, Dict[str, Any]] = {}
    
    for transformer in TRANSFORMERS:
        print(f"   Processing source: {transformer.source_file}...")
        
        raw_data = load_source_data(transformer.source_file)
        if not raw_data:
            continue
            
        try:
            transformed_data = transformer.transform(raw_data)
            
            count = 0
            for project in transformed_data:
                if validate_schema(project):
                    key = get_unique_key(project)
                    # Overwrite existing key to allow updates
                    all_projects_map[key] = project
                    count += 1
                else:
                    print(f"   ⚠️  Skipping invalid project: {project.get('title', 'Unknown')}")
            
            print(f"   ✅ Loaded {count} projects.")
            
        except Exception as e:
            print(f"   ❌ Error transforming {transformer.source_file}: {e}")

    # Convert map back to list and sort deterministically
    final_projects = list(all_projects_map.values())
    final_projects.sort(key=lambda p: (p['title'], p['organiser']['name']))
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(final_projects, f, indent=2, ensure_ascii=False)
        
    print(f"🎉 Successfully merged {len(final_projects)} projects into {OUTPUT_FILE}")

if __name__ == "__main__":
    main()