import React, { createContext, useContext, useEffect, useState } from "react";
import AnimalModel from "../model/AnimalModel";
import CropModel from "../model/CropModel";
import { getIdUserByToken } from "./JwtService";
import { getAllAnimal } from "../api/AnimalApi";
import { getAllCrop } from "../api/CropApi";

interface DataProps {
  children: React.ReactNode;
}

interface DataType {
  animals: AnimalModel[];
  setAnimals: React.Dispatch<React.SetStateAction<AnimalModel[]>>;
  crops: CropModel[];
  setCrops: React.Dispatch<React.SetStateAction<CropModel[]>>;
  loading: boolean;
  error: Error | null;
}

const DataItem = createContext<DataType | undefined>(undefined);

export const DataProvider: React.FC<DataProps> = ({ children }) => {
  const [animals, setAnimals] = useState<AnimalModel[]>([]);
  const [crops, setCrops] = useState<CropModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  const userId = getIdUserByToken();

  useEffect(() => {
    // Fetch Animal Data
    getAllAnimal(userId)
      .then((response) => {
        setAnimals(response);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

    // Fetch Crop Data (example)
    getAllCrop(userId)
      .then((response) => {
        setCrops(response);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [userId]);

  return (
    <DataItem.Provider
      value={{ animals, setAnimals, crops, setCrops, loading, error }}
    >
      {children}
    </DataItem.Provider>
  );
};

export const useDataContext = (): DataType=> {
	const context = useContext(DataItem);
	if (!context) {
		throw new Error("Lỗi context");
	}
	return context;
};