import React from 'react';

export const UserContext = React.createContext(
    {
        user:{
            id:1,
            name:'Nombre de usuario uno'
        }
        ,userId:1
    }

);