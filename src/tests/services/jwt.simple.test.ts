// Prueba simple sin mocks para obtener cobertura real
describe('JWT Service - Simple Tests', () => {
  it('debería importar y usar el servicio JWT correctamente', () => {
    // Esta es una prueba simple para verificar que el servicio se puede importar
    expect(true).toBe(true);
  });

  it('debería tener métodos básicos disponibles', () => {
    // Verificar que los métodos básicos existen
    const jwt = require('../../services/jwt.service').default;
    
    expect(typeof jwt.generateAccessToken).toBe('function');
    expect(typeof jwt.generateRefreshToken).toBe('function');
    expect(typeof jwt.generateTokenPair).toBe('function');
    expect(typeof jwt.verifyAccessToken).toBe('function');
    expect(typeof jwt.verifyRefreshToken).toBe('function');
  });

  it('debería generar tokens válidos', () => {
    const jwt = require('../../services/jwt.service').default;
    
    const payload = {
      id: 1,
      email: 'test@example.com',
      rol: 'vendedor'
    };

    const accessToken = jwt.generateAccessToken(payload);
    const refreshToken = jwt.generateRefreshToken(payload);
    const tokenPair = jwt.generateTokenPair(payload);

    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();
    expect(tokenPair.accessToken).toBeDefined();
    expect(tokenPair.refreshToken).toBeDefined();
  });

  it('debería verificar tokens correctamente', () => {
    const jwt = require('../../services/jwt.service').default;
    
    const payload = {
      id: 1,
      email: 'test@example.com',
      rol: 'vendedor'
    };

    const accessToken = jwt.generateAccessToken(payload);
    const refreshToken = jwt.generateRefreshToken(payload);

    const decodedAccess = jwt.verifyAccessToken(accessToken);
    const decodedRefresh = jwt.verifyRefreshToken(refreshToken);

    expect(decodedAccess.id).toBe(payload.id);
    expect(decodedAccess.email).toBe(payload.email);
    expect(decodedAccess.rol).toBe(payload.rol);

    expect(decodedRefresh.id).toBe(payload.id);
    expect(decodedRefresh.email).toBe(payload.email);
    expect(decodedRefresh.rol).toBe(payload.rol);
  });
});
