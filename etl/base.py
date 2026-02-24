from abc import ABC, abstractmethod
from typing import List, Dict, Any

class ProjectTransformer(ABC):
    @property
    @abstractmethod
    def source_file(self) -> str:
        """The filename in etl/sources/ to read from."""
        pass

    @abstractmethod
    def transform(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Transform raw data into the canonical schema.
        Should return a list of project dictionaries matching the final schema.
        """
        pass