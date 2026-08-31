const STORAGE_KEY = 'passaadiante:currentUserId';

/**
 * IDs fixos dos usuários de demonstração criados pelo seed do back
 * (PassaAdiante-NestJS, prisma/seed.ts). Não há login/autenticação real no MVP:
 * cada perfil escolhido em /escolher-perfil é associado a um desses usuários.
 */
export const DEMO_USER_IDS = {
    COMUM: '00000000-0000-0000-0000-000000000001',
    ADMIN: '00000000-0000-0000-0000-000000000002',
};

export function setCurrentUserId(userId) {
    localStorage.setItem(STORAGE_KEY, userId);
}

export function getCurrentUserId() {
    return localStorage.getItem(STORAGE_KEY);
}
