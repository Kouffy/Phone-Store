using WebApplication1.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }
        public URBADBEntities db = new URBADBEntities();
        public JsonResult AfficherAdmin()
        {
            var admins = db.ADMINSTRATEUR.ToList();
            return Json(admins, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Details(int id)
        {
            var adm = db.ADMINSTRATEUR.Find(id);
            return Json(adm, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Ajouter(ADMINSTRATEUR adm)
        {
            db.ADMINSTRATEUR.Add(adm);
            db.SaveChanges();
            return null;
        }
        [HttpPost]
        public JsonResult Modifier(ADMINSTRATEUR adm)
        {
            db.Entry(adm).State = EntityState.Modified;
            db.SaveChanges();
            return null;
        }

        public JsonResult Delete(int id)
        {
            var c = db.ADMINSTRATEUR.Find(id);
            db.ADMINSTRATEUR.Remove(c);
            db.SaveChanges();
            return null;
        }
    }
}