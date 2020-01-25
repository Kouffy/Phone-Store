using WebApplication1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class CommandeController : Controller
    {
        URBADBEntities db = new URBADBEntities();
        // GET: Commande
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ListCommande(KHFIF3 vue1)
        {
            db.Configuration.ProxyCreationEnabled = false;
                var commands = db.KHFIF3.ToList();
            return Json(commands,JsonRequestBehavior.AllowGet);
        }



    }
}