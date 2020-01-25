using WebApplication1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class SousCategorieController : Controller
    {
        // GET: SousCategorie
        public ActionResult Index()
        {
            return View();
        }
        public URBADBEntities db = new URBADBEntities();
        public JsonResult AfficherSousCategories()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var souscategories = db.SOUSCATEGORIE.ToList();
            return Json(souscategories, JsonRequestBehavior.AllowGet);
        }
    }
}