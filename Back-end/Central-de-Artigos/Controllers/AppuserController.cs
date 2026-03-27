using Central_de_Artigos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
// Developed by Ruan Marcelo
// GitHub: https://github.com/seu-usuario

namespace Central_de_Artigos.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("appuser")]
    public class AppuserController : ApiController
    {

      CentralArtigosEntities db = new CentralArtigosEntities();

        [HttpPost, Route("login")]
        public HttpResponseMessage Login([FromBody] Appuser appuser)
        {
            try
            {
                Appuser userObj = db.Appusers
                    .Where(u => (u.email == appuser.email && u.password == appuser.password)).FirstOrDefault();
                if (userObj != null)
                {
                    if (userObj.status == "true")
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, new { token = TokenManager.GenerateToken(userObj.email, userObj.isDeletable) });
                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.Unauthorized, new { message = "Aguarde a aprovação do administrador" });
                    }
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.Unauthorized, new { message = "Email ou senha Incorreto" });
                }
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpPost, Route("addNewAppuser")]
        [CustomAuthenticationFilter]
        public HttpResponseMessage AddNewAppuser([FromBody] Appuser appuser)
        {
            try
            {
                Appuser userObj = db.Appusers
                    .Where(u=> u.email == appuser.email).FirstOrDefault();
                if(userObj == null)
                {
                    appuser.status = "false";
                    appuser.isDeletable = "true";  
                    db.Appusers.Add(appuser);
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, new { message = "Usuário cadastrado com sucesso" });
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, new { message = "Email já cadastrado" });
                }
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpGet,Route("getAllAppuser")]
        [CustomAuthenticationFilter]
        public HttpResponseMessage GetAllAppuser()
        {
            try
            {
                var token = Request.Headers.GetValues("authorization").First();
                TokenClaim  tokenClaim = TokenManager.ValidateToken(token);
                if(tokenClaim.isDeletable == "false")
                {
                    var result = db.Appusers
                        .Select(u => new { u.id,u.name, u.email, u.status, u.isDeletable })
                        .Where(x => (x.isDeletable == "true"));
                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
                else
                {
                    var result = db.Appusers
                        .Select(u => new { u.id, u.name, u.email, u.status, u.isDeletable })
                        .Where(x => (x.isDeletable == "true") && x.email != tokenClaim.Email);
                    return Request.CreateResponse(HttpStatusCode.OK, result);
                }
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpPost, Route("updateUserStatus")]
        [CustomAuthenticationFilter]
        public HttpResponseMessage UpdateUSerstatus([FromBody] Appuser appuser)
        {
            try
            {
                Appuser userObj = db.Appusers.FirstOrDefault(u => u.id == appuser.id && u.isDeletable == "true");
                if(userObj == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Usuário não encontrado ou não é deletável" });
                }
                userObj.status = appuser.status;
                db.Entry(userObj).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Status do usuário atualizado com sucesso" });
            }
            catch(Exception e) 
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpPost, Route("updateUser")]
        [CustomAuthenticationFilter]
        public HttpResponseMessage UpdateUSer([FromBody] Appuser appuser)
        {
            try
            {
                Appuser userObj = db.Appusers.FirstOrDefault(u => u.id == appuser.id && u.isDeletable == "true");
                if (userObj == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, new { message = "Usuário não encontrado ou não é deletável" });
                }
                userObj.name = appuser.name;
                userObj.email = appuser.email;  
                db.Entry(userObj).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, new { message = "Usuário atualizado com sucesso" });
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, e);
            }
        }
    }
}
