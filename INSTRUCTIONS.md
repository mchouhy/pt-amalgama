# Ejercicio Frontend

Dado los siguientes endpoints:

- **Endpoint 1: Login**

  [POST] `https://2v234d7xc7.execute-api.us-east-1.amazonaws.com/default/login`

  **Parámetros:**

  - email: user@amalgama.co
  - password: password

  La API devuelve el token de autorización. Dicho token será utilizado para los siguientes requests y deberá ser enviado en el header `Authorization`, de esta forma:

Authorization: Bearer token

**Posibles errores de la API:**

1. Status Code 401 Unauthorized.

**NOTA IMPORTANTE:** No acepta JSON, hay que enviarle la información en `application/x-www-form-urlencoded` o en `multipart/form-data`.

- **Endpoint 2: Books**

[GET] `https://2v234d7xc7.execute-api.us-east-1.amazonaws.com/default/books`

- **Endpoint 3: Users**

[GET] `https://2v234d7xc7.execute-api.us-east-1.amazonaws.com/default/users`

## Se pide:

1. Crear una pantalla de login con email y password.

- **a.** Handlear el caso de error.

2. Una vez hecho login, se accede a las pantallas privadas de la app.

- **a.** Si uno no está logueado, sólo puede ver la pantalla de login.
- **b.** Si uno está logueado e intenta ir a la pantalla de login, debe redirigir a alguna de las pantallas privadas que se considere como la principal.

---

## Ejercicio Frontend 2

3. Crear una pantalla que muestre una lista de usuarios con su id, email, nickname y el título de sus libros favoritos.

4. Crear una pantalla que muestre una lista de los libros disponibles con su id, título y el nombre del autor.

- **a.** Desde esta pantalla también se debe poder cambiar el título a un libro (modifica el state local).

5. Crear una pantalla que muestre una lista de los autores con su id y nombre.

- **a.** Desde esta pantalla también se debe poder cambiar el nombre a un autor (modifica el state local).

6. Guardar la respuesta de los requests con alguna forma de state management.

7. Debe poderse navegar entre las pantallas viendo siempre la información actualizada.

---

## Aclaraciones

- Usá el framework/librería que más te guste.
- El diseño de la UI no es importante. Podés usar una librería de componentes (no es requerido).
- Se evalúa la aplicación de buenas prácticas de programación, pensando siempre en la escalabilidad del proyecto.
- Si tomaste una decisión que no estás contento por falta de tiempo, podés explicar cómo lo mejorarías.
