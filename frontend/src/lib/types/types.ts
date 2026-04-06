
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  image?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  refetchUser: () => Promise<void>;
  login: (userData: User) => void;
  logout: () => void;
}

export interface NavbarProps {
  user?: User | null;
  onLogout?: () => void;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData {
  name: string;
  email: string;
  password: string;
  image?: string;
}

export interface MediaCardProps {
  item: {
    id: string;
    title: string;
    coverImage: string;
    averageRating: number;
    releaseYear: number;
    genre?: string;
    type?: "Movie" | "Series";
    totalRatings?: number;
  };
}
