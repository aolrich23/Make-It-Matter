from typing import List, Dict, Any
from .base import ProjectTransformer

class ManualTransformer(ProjectTransformer):
    """
    Handles manually entered projects. 
    Assumes data is already in the canonical format.
    """
    source_file = "manual.json"

    def transform(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        # Since manual data is already normalized, we just pass it through.
        # In a real scenario, you might add validation here.
        return raw_data