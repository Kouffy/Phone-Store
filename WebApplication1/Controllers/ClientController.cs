using WebApplication1.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data.SqlClient;

namespace WebApplication1.Controllers
{
    public class ClientController : Controller
    {
        SqlConnection connection = new SqlConnection("Data Source=DESKTOP-3F5CET7;Initial Catalog=URBADB;Integrated Security=True");
        SqlCommand command = new SqlCommand();
        SqlCommand command0 = new SqlCommand();
        SqlCommand command1 = new SqlCommand();
        SqlCommand command2 = new SqlCommand();
        // GET: Client
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Login()
        {       
            return View();
        }
        public ActionResult Register()
        {
            return View();
        }
        public ActionResult Logout()
        {
            Session["iduser"] = null;
            Session["username"] = null;
            Session["previlege"] = null;
            return RedirectToAction("Login");
        }
        public ActionResult Verfication(CLIENT clt)
        {
            connection.Open();
            command.Connection = connection;
            command0.Connection = connection;
            command1.Connection = connection;
            command2.Connection = connection;
            command.CommandText = "SELECT COUNT(*) FROM CLIENT WHERE email LIKE '"+clt.email+"' AND passwordd LIKE '"+clt.passwordd+"'";
            if(Convert.ToInt32(command.ExecuteScalar()) !=0 )
            {
                command0.CommandText = "SELECT role FROM CLIENT WHERE email LIKE '" + clt.email + "' AND passwordd LIKE '" + clt.passwordd + "'";
                if(command0.ExecuteScalar().ToString().Equals("client"))
                {
                    command1.CommandText = "SELECT id FROM CLIENT WHERE email LIKE '" + clt.email + "' AND passwordd LIKE '" + clt.passwordd + "'";
                    command2.CommandText = "SELECT * FROM CLIENT WHERE email LIKE '" + clt.email + "' AND passwordd LIKE '" + clt.passwordd + "'";
                    using (SqlDataReader oReader = command2.ExecuteReader())
                    {
                        while (oReader.Read())
                        {
                            Session["username"] = oReader["nom"].ToString();
                            Session["previlege"] = oReader["role"].ToString();
                        }

                    }
                    Session["iduser"] = command1.ExecuteScalar().ToString();

                        return Redirect("/Home/Indix");
                    
                    
                }
                else if (command0.ExecuteScalar().ToString().Equals("admin"))
                {
                    command1.CommandText = "SELECT id FROM CLIENT WHERE email LIKE '" + clt.email + "' AND passwordd LIKE '" + clt.passwordd + "'";
                    command2.CommandText = "SELECT * FROM CLIENT WHERE email LIKE '" + clt.email + "' AND passwordd LIKE '" + clt.passwordd + "'";
                    using (SqlDataReader oReader = command2.ExecuteReader())
                    {
                        while (oReader.Read())
                        {
                            Session["username"] = oReader["nom"].ToString();
                            Session["previlege"] = oReader["role"].ToString();
                        }

                    }
                    Session["iduser"] = command1.ExecuteScalar().ToString();
                    return Redirect("/Commande/Index");                    
                }         
            }
          
            ViewBag.Message = "Les Information de connexion Sont Errones";
            return View("Login");
        }
        public URBADBEntities db = new URBADBEntities();
        // GET: Client
        public JsonResult AfficherClient()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var clients = db.CLIENT.ToList();
            return Json(clients, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Details(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            var clt = db.CLIENT.Find(id);
            return Json(clt, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            var c = db.CLIENT.Find(id);
            db.CLIENT.Remove(c);
            db.SaveChanges();
            return null;
        }
        [HttpPost]
        public JsonResult Create(CLIENT clt)
        {
            db.Configuration.ProxyCreationEnabled = false;
            clt.role = "client";
            db.CLIENT.Add(clt);

            db.SaveChanges();
            return null;
        }
        [HttpPost]
        public JsonResult Modifier(CLIENT clt)
        {
            db.Configuration.ProxyCreationEnabled = false;
            clt.role = "client";
            db.Entry(clt).State = EntityState.Modified;
            db.SaveChanges();
            return null;
        }
    }
}