# Eagerworks QA Automation Challenge

Este repositorio contiene la solución al challenge técnico de automatización QA para Eagerworks. Se implementaron pruebas **UI automatizadas con Playwright + Cucumber** sobre el sitio [https://automationexercise.com](https://automationexercise.com), siguiendo buenas prácticas de estructura y uso de Page Objects.

---

## 📦 Tecnologías utilizadas

- [Playwright](https://playwright.dev/)
- [Cucumber (Gherkin)](https://cucumber.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Faker.js](https://fakerjs.dev/)

---

## 📁 Estructura del proyecto

```
eagerworks-challenge/
├── features/
│   ├── ui/
│   │   └── registerAndLogin.feature
│   └── step-definitions/
│       └── uiSteps.ts
├── pages/
│   ├── RegisterPage.ts
│   └── LoginPage.ts
├── utils/
│   └── dataGenerator.ts
├── data/
│   └── tempUser.json
├── cucumber.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🧪 Instrucciones para ejecutar los tests

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/eagerworks-challenge.git
cd eagerworks-challenge
```

### 2. Instalar dependencias

```bash
npm install
npx playwright install
```

### 3. Ejecutar los tests (modo headless)

```bash
npm test
```

> Si querés correr los tests en modo visual, podés editar `uiSteps.ts` y cambiar `{ headless: true }` por `{ headless: false }` al lanzar el navegador.

---

## ✅ Descripción de los tests

### UI Tests – https://automationexercise.com

Se automatizó un escenario completo de registro e inicio de sesión utilizando Playwright y Cucumber:

- Se genera un nuevo usuario usando Faker (nombre, email y contraseña).
- Se completa el formulario completo en `/signup`, incluyendo dirección y teléfono.
- Se valida la creación de cuenta (`Account Created!`).
- Se inicia sesión con ese mismo usuario.
- Se verifica que el usuario aparece logueado (`Logged in as <nombre>`).

> Todas las interacciones están separadas en Page Objects (`RegisterPage`, `LoginPage`) para facilitar mantenimiento y escalabilidad.

### API Tests

> 🔧 No implementados en esta etapa, pero se podría extender fácilmente utilizando `request.newContext()` de Playwright y agregando features para la API de [https://reqres.in](https://reqres.in).

---

## 🌐 API Tests – https://reqres.in

Para esta parte del challenge se seleccionaron dos endpoints del servicio público `https://reqres.in`. El objetivo fue cumplir con los siguientes criterios para cada endpoint:

- ✅ Validar el código de estado HTTP (Status Code)
- ✅ Verificar que el tiempo de respuesta esté por debajo de 3 segundos
- ✅ Validar el contenido y estructura del cuerpo (Body)
- ✅ Confirmar encabezados relevantes (Headers)

### ✔️ Test 1 – GET /api/users/2

Este test verifica la existencia de un usuario específico (ID: 2). Es un endpoint sencillo y confiable.

- Status esperado: `200 OK`
- Tiempo de respuesta: < 3000 ms
- Encabezado: `Content-Type: application/json`
- Estructura: el objeto debe contener `id`, `email`, `first_name`, `last_name`, `avatar`

Este test pasa correctamente y demuestra el uso básico de Playwright para validar servicios REST.

### ❌ Test 2 – GET /api/unknown/2

Este test busca validar la existencia de un recurso de color en el endpoint `/api/unknown/2`, que normalmente debería funcionar sin autenticación.

Sin embargo, este test **falla con un código 401 Unauthorized**, indicando que:

```json
{
  "error": "Missing API key.",
  "how_to_get_one": "https://reqres.in/signup"
}
```

Esto sugiere que `reqres.in` ha empezado a **requerir autenticación incluso para endpoints públicos**, lo cual **no es parte de su comportamiento anterior ni está documentado claramente**.

---

### 🔎 Conclusión

- Se mantuvieron ambos tests en el proyecto para mostrar tanto un caso **válido y exitoso**, como uno **fallido realista y bien justificado**.
- Esto demuestra capacidad para investigar errores reales en APIs externas, analizar mensajes de error, y documentar correctamente lo encontrado.
