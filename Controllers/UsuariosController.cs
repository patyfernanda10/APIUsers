using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using meuProjetoApi.Models;
using System.Runtime.Versioning;

namespace MeuProjetoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private string connectionString = "Server=localhost;Database=Users;User ID=root;Password=123456;";


    [HttpGet]
    public IActionResult GetUsuarios()
    {
        List<Users> usuarios = new List<Users>();
        
        using (MySqlConnection conn = new MySqlConnection(connectionString))
        {
            try
            {
                conn.Open();
                string query = "SELECT * FROM Users";
                using (MySqlCommand cmd = new MySqlCommand(query, conn))
                {
                    using (MySqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            usuarios.Add(new Users
                            {    Id = reader.GetInt32("id"),
                                Name = reader.GetString("name"),
                                Age = reader.GetInt32("age")
                            });
                        }
                    }
                }
                
                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

        [HttpPost]
        public IActionResult PostUsuario([FromBody] Users usuario)
        {
           using (MySqlConnection conn = new MySqlConnection(connectionString))
           {
                try
                {
                    conn.Open();
                    string query = "INSERT INTO Users (name, age) VALUES (@name, @age)";
                    using (MySqlCommand cmd = new MySqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@name",usuario.Name);
                        cmd.Parameters.AddWithValue("@age", usuario.Age);
                        cmd.ExecuteNonQuery();
                    }
                    
                    return CreatedAtAction(nameof(PostUsuario), usuario);
                }
                    catch (Exception ex)
                    {
                        return BadRequest(ex.Message);
                    }
           }

        }

    [HttpDelete("{id}")]
    public IActionResult DeleteUsuario(int id)
    {
      using (MySqlConnection conn = new MySqlConnection(connectionString))
      {
            try
            {
                conn.Open();
                string query = "DELETE FROM Users WHERE id = @id";
                using (MySqlCommand cmd = new MySqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    int rowsAffected = cmd.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        return Ok(new { message = "Usuário excluído com sucesso!" });
                    }
                    else
                    {
                        return NotFound(new { message = "Usuário não encontrado." });
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno no servidor", error = ex.Message });
            }
        }
    }

    [HttpPut("{id}")]
    public IActionResult PutUsuario(int id, [FromBody] Users usuarioAtualizado)
    {
        using (MySqlConnection conn = new MySqlConnection(connectionString))
        {
        try
            {
                conn.Open();
                string query = "UPDATE Users SET Name = @name, Age = @age WHERE id = @id";
                using (MySqlCommand cmd = new MySqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@name", usuarioAtualizado.Name);
                    cmd.Parameters.AddWithValue("@age", usuarioAtualizado.Age);
                    int rowsAffected = cmd.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        return Ok(new { message = "Usuário atualizado com sucesso!" });
                    }
                    else
                    {
                        return NotFound(new { message = "Usuário não encontrado." });
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Erro interno no servidor", error = ex.Message });
            }
        }
    }


    }
}

