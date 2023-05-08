import { rolesConfig } from '../../config/roles.config';

export async function matchRoles(
  roles: string[],
  sub_roles: string[],
): Promise<boolean> {
  const rolesLength = roles.length;
  const matchedRoles: string[] = [];

  let devEnv: boolean;

  sub_roles.filter((role) => {
    roles.find((appRole) => {
      if (
        role !== 'CLOSER' &&
        role !== 'HUNTER' &&
        process.env.NODE_ENV === 'DEVELOPMENT'
      ) {
        devEnv = true;
      } else if (appRole === role && process.env.NODE_ENV === 'PRODUCTION') {
        if (rolesConfig[`${role}`]) {
          matchedRoles.push(role);
        }
      }
    });
  });

  if ((matchedRoles.length === rolesLength && !devEnv) || devEnv) {
    return true;
  } else {
    return false;
  }
}
