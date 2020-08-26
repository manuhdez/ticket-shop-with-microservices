export class Environment {
  envList = ['PORT', 'DB_URL', 'JWT_KEY'];

  /**
   * Throws an error if there is a missing environment variable needed to work
   * @throws Error
   */
  checkVariables() {
    this.envList.forEach((variable) => {
      if (!process.env[variable])
        throw new Error(`Missing env variable ${variable}`);
    });
  }
}
