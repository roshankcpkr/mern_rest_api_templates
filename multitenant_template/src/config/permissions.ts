export const ALL_PERMISSIONS = [
    //users
    'users:roles:write',//allowed to add a roles to a user
    'users:roles:delete', //allowed to remove a role from a user
    //post
    `posts:write`,
    `posts:read`,
    `posts:delete`,
    `posts:edit-own`,
] as const

export const PERMISSIONS = ALL_PERMISSIONS.reduce((acc, permission) => {
    acc[permission] = permission
    
    
    return acc
}, {} as Record<(typeof ALL_PERMISSIONS)[number], (typeof ALL_PERMISSIONS)[number]>)

export const USER_ROLE_PERMISSION = [
    PERMISSIONS['posts:read'],
    PERMISSIONS['posts:write']
]

export const SYSTEM_ROLE = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    APPLICATION_USER: 'APPLICATION_USER'
}

