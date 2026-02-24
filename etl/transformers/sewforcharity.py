from datetime import datetime
from typing import List, Dict, Any
from .base import ProjectTransformer

class SewForCharityTransformer(ProjectTransformer):
    source_file = "sewforcharity.json"

    def transform(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        transformed = []
        today = datetime.now().strftime("%Y-%m-%d")
        
        for item in raw_data:
            title = item.get("title", "").strip()
            
            # 1. Exclude "Savvy Shoppers" (Not a craft project)
            if "Savvy Shoppers" in title:
                continue

            # 2. Map Urgency (Colour)
            # Red = Stop (Exclude), Green = Good (High), Yellow = Slow (Low)
            colour = item.get("colour", "").lower()
            if colour == "red":
                continue
            elif colour == "green":
                need = "High"
            elif colour == "yellow":
                need = "Low"
            else:
                need = "Medium" # Fallback

            # 3. Craft & Equipment Mapping
            crafts = ["Sewing"]
            equipment_list = ["Sewing Machine"]
            materials = [{"type": "Fabric", "amount": "See pattern"}]
            
            if "Worry Worms" in title or "Heart String Hearts" in title:
                crafts = ["Crochet"]
                equipment_list = ["Crochet Hook"]
                materials = [{"type": "Yarn", "amount": "See pattern"}]
            elif "Soft Toys" in title:
                crafts = ["Sewing", "Knitting", "Crochet"]
                equipment_list = ["Sewing Machine", "Knitting Needles", "Crochet Hook"]
                materials = [{"type": "Fabric/Yarn", "amount": "See pattern"}]

            # 4. Construct Project
            project = {
                "title": title,
                # Use title as description placeholder
                "description": title, 
                "organiser": {
                    "name": "Sewing for Charity Australia",
                    "url": "https://sewingforcharity.com/",
                    "location": "QLD"
                },
                "category": "Family Services",
                "craft": crafts,
                "equipment": equipment_list,
                "materials": materials,
                "approximateTime": "Varies",
                "need": need,
                "lastUpdated": today,
                "pattern": {
                    "text": "Download Project Sheet",
                    "url": item.get("link", "")
                },
                "deadline": "Ongoing",
                "image": item.get("image", ""),
                "donationInstructions": "Mail to: 38 Bladensburg Drive, Waterford QLD 4133. Deliver to: The Sewing Lair Beenleigh or Moorooka. Please label donations."
            }
            
            transformed.append(project)
            
        return transformed