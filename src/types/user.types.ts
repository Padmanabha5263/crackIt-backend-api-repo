

// user item for storing the user item in the database
export type UserItem={
    id?: string,
    name?: string,
    dob: Date,
    email: string,
    phone?: string,
    password: string,
    usertype:UserRoles
}

// type for the user roles 
export type UserRoles
= "student" | "admin"
