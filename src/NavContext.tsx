import { type Dispatch, type ReactNode, type SetStateAction, createContext, useState } from "react";

type GymListProps = Array<{ id: string; name: string }> | null;

type NavContextProps = NavStateProps | null;

export type NavStateProps = {
  gymList: GymListProps;
  setGymList: Dispatch<SetStateAction<GymListProps | null>>;
  selectedGymId: string | null;
  setSelectedGymId: Dispatch<SetStateAction<string | null>>;
};

const NavContext = createContext<NavContextProps>(null);

const NavContextProvider = ({ children }: { children: ReactNode }) => {
  const [gymList, setGymList] = useState<GymListProps>(null);
  const [selectedGymId, setSelectedGymId] = useState<null | string>(null);
  return (
    <NavContext.Provider value={{ gymList, setGymList, selectedGymId, setSelectedGymId }}>
      {children}
    </NavContext.Provider>
  );
};

export { NavContext, NavContextProvider };
