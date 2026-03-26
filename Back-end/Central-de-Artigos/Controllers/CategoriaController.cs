using Central_de_Artigos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Central_de_Artigos.Controllers
{
    // Developed by Ruan Marcelo
    // GitHub: https://github.com/seu-usuario

    [RoutePrefix("categoria")]
    public class CategoriaController : ApiController
    {
        CentralArtigosEntities db = new CentralArtigosEntities();

        [HttpPost, Route("addNewCategoria")]
        [CustomAuthenticationFilter]
        public HttpResponseMessage AddNewCategoria([FromBody] Categoria categoria)
        {
            try
            {
                db.Categorias.Add(categoria);
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Categoria adicionada com sucesso" });

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpGet, Route("getAllCategorias")]
        [CustomAuthenticationFilter]
        public HttpResponseMessage GetAllCategorias()
        {
            try
            {
                var categorias = db.Categorias.OrderBy(categoria => categoria.name).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, categorias);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpPost, Route("updateCategoria")]
        [CustomAuthenticationFilter]
        public HttpResponseMessage updateCategoria([FromBody]Categoria categoria)
        {
            try
            {
                Categoria categoriaObj = db.Categorias.Find(categoria.id);
                if(categoriaObj == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Categoria não encontrada" });
                }
                categoriaObj.name = categoria.name;
                db.Entry(categoriaObj).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Categoria atualizada com sucesso" });
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e);
            }
        }
    }
}
