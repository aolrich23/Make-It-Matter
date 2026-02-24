from typing import List, Dict, Any
from .base import ProjectTransformer

class ManualTransformer(ProjectTransformer):
    source_file = "manual.json"

    def transform(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        # Manual data is already in the correct schema
        return raw_data