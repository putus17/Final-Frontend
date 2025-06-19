import type { RegionType, UserRole } from "../lib/constants";

export type AddUserType = {
    name: string
    role?: UserRole
    cid: string;
    phone: string;
    password?: string;
};

export type LoginType = {
  identifier : string;
  password: string;
};

export type UserType = {
  _id: string;
  name: string;
  cid: string;
  phone?: string;
  role?: UserRole;
};

export type UserFormValues = {
  _id: string;
  name?: string;
  phone?: string;
  cid?: string;
  role?: UserRole;
  password?: string
};

export type UserUpdateType = {
  userId?: string;
  name?: string;
  cid?: string;
  phone?: string;
  role?: UserRole;
  password?: string
};


export type RegisterResponse = {
  data: UserType;
  token: string;
};

export type LoginResponse = {
  message: string;
  token: string;
};

export type GetUsersResponse = {
  data: UserType[];
};

export type UpdateUsersResponse = {
  message: string;
  data: UserType;
};

export type DeleteUserResponse = {
  message: string;
};


export type DzongkhagType = {
  _id: string;
  name: string;
  nameInDzongkha: string;
  code: string;
  region: RegionType;
  area: number;
  population: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string

};

export type DzongkhagResponse = {
  data: DzongkhagType [];
  message: string;
};
export type CreateUpdateDzongkhagResponse = {
  data: DzongkhagType;
  message: string;
};

export type DzongkhagUpdateType = {
  _id?: string;
  name?: string;
  nameInDzongkha?: string;
  code?: string;
  area: number;
  region?: RegionType;
  population?: number;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
};

export type GewogType = {
  _id: string;
  name: string;
  nameInDzongkha: string;
  dzongkhag: string | DzongkhagType; // Accept string ID or full object if populated
  area: number;
  population: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
};

export type GewogResponse = {
  data: GewogType[];
  message: string;
};

export type CreateUpdateGewogResponse = {
  data: GewogType;
  message: string;
};


export type GewogUpdateType = {
  _id?: string;
  name?: string;
  nameInDzongkha?: string;
  dzongkhag?: string | DzongkhagType; // Accept string ID or full object if populated
  area?: number;
  population?: number;
  coordinates?: {
    latitude?: number;
    longitude?: number;
  };
};















