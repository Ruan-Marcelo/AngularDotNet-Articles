using Central_de_Artigos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
// Developed by Ruan Marcelo
// GitHub: https://github.com/seu-usuario
namespace Central_de_Artigos.Controllers
{
    [RoutePrefix("artigo")]
    public class ArtigoController : ApiController
    {
        CentralArtigosEntities db = new CentralArtigosEntities();

        [HttpPost, Route("addNewArtigo")]
        [CustomAuthenticationFilter]
        public HttpResponseMessage AddNewArtigo([FromBody] Artigos artigo)
        {
            try
            {
                artigo.data_publicacao = DateTime.Now;
                db.Artigos.Add(artigo);
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Artigo adicionado com sucesso" });
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e);
            }
        }


        [HttpGet, Route("getAllArtigo")]
        [CustomAuthenticationFilter]
        public HttpResponseMessage getAllArtigo()
        {
            try
            {
                var resultado = db.Artigos
                    .Join(db.Categorias,
                     artigos => artigos.categoriaId,
                     categoria => categoria.id,
                     (artigo, categoria) => new
                     {
                         artigo.id,
                         artigo.titulo,
                         artigo.conteudo,
                         artigo.status,
                         artigo.data_publicacao,
                         categoriaId = categoria.id,
                         categoriaName = categoria.name
                     }).ToList();
                return Request.CreateResponse(HttpStatusCode.OK, resultado);

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e);
            }
        }


        [HttpGet, Route("getAllPublicadoArtigo")]
        public HttpResponseMessage gaeAllPublicadoArtigo()
        {
            try
            {
                var resultado = db.Artigos
                    .Join(db.Categorias,
                     artigos => artigos.categoriaId,
                     categoria => categoria.id,
                     (artigo, categoria) => new
                     {
                         artigo.id,
                         artigo.titulo,
                         artigo.conteudo,
                         artigo.status,
                         artigo.data_publicacao,
                         categoriaId = categoria.name,
                         categoriaName = categoria.name
                     })
                     .Where(a => a.status == "publicado")
                     .ToList();
                return Request.CreateResponse(HttpStatusCode.OK, resultado);

            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpPost, Route("updateArtigo")]
        [CustomAuthenticationFilter]
        public HttpResponseMessage updateArtigo([FromBody] Artigos artigo)
        {
            try
            {
                Artigos artigoObj = db.Artigos.Find(artigo.id);
                if (artigoObj == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Artigo não encontrado" });
                }
                artigoObj.titulo = artigo.titulo;
                artigoObj.conteudo = artigo.conteudo;
                artigoObj.categoriaId = artigo.categoriaId;
                artigoObj.data_publicacao = DateTime.Now;
                artigoObj.status = artigo.status;
                db.Entry(artigoObj).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Artigo atualizado com sucesso" });
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.OK, e);
            }
        }

        [HttpDelete, Route("deleteArtigo/{id}")]
        [CustomAuthenticationFilter]
        public HttpResponseMessage deleteArtigo(int id)
        {
            try
            {
                Artigos artigoObj = db.Artigos.Find(id);
                if (artigoObj == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Artigo não encontrado" });
                }
                db.Artigos.Remove(artigoObj);
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Artigo deletado com sucesso" });
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e);
            }
        }
    }
}
