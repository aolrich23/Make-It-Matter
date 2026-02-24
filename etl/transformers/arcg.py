from typing import List, Dict, Any
from .base import ProjectTransformer

class ARCGTransformer(ProjectTransformer):
    source_file = "arcg.json"

    def transform(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        # ARCG data is already in the correct schema
        return raw_data