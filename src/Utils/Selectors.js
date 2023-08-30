export const connexion = (state) => state.connexion.fetching

export const statusConnexion = (state) => state.connexion.status
export const message = (state) => state.connexion.message
export const token = (state) => state.connexion.token.token
export const connected = (state) => state.connexion.connected
export const lastName = (state) => state.user.lastname
export const firstName = (state) => state.user.firstname
export const userName = (state) => state.user.username 

export const newUserFetch = (state) => state.newUser.fetching
export const newUserStatus = (state) => state.newUser.status

export const editingStatus = (state) => state.editing.status
export const editingfetching = (state) => state.editing.fetching

export const mail = (state) => state.remember.mail
export const stock = (state) => state.remember.remember
