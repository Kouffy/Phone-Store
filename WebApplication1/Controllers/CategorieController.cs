using WebApplication1.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class CategorieController : Controller
    {
        // GET: Categorie
        public ActionResult Index()
        {
            return View();
        }
        URBADBEntities db = new URBADBEntities();


        public JsonResult AfficherCategories()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var categories = db.CATEGORIE.ToList();
            return Json(categories, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Index2()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var scategories = (from s in db.SOUSCATEGORIE
                            //   join c in db.CATEGORIE
                              // on s.idcat equals c.id
                               select new
                               {
                                   id = s.id,
                                   libelle = s.libelle,
                                   idcat = s.CATEGORIE.libelle

                               }).ToList();
            return Json(scategories, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Create(CATEGORIE cat)
        {
            db.CATEGORIE.Add(cat);

            db.SaveChanges();
            return null;
        }
        public JsonResult AjouterSousCategorie(SOUSCATEGORIE scat)
        {
            db.Configuration.ProxyCreationEnabled = false;
            db.SOUSCATEGORIE.Add(scat);
            db.SaveChanges();
            return null;
        }
        [HttpPost]
        public JsonResult Modifier(CATEGORIE cat)
        {
            db.Configuration.ProxyCreationEnabled = false;
            db.Entry(cat).State = EntityState.Modified;
            db.SaveChanges();
            return null;
        }
        [HttpPost]
        public JsonResult Modifier2(SOUSCATEGORIE cat)
        {
            db.Configuration.ProxyCreationEnabled = false;
            db.Entry(cat).State = EntityState.Modified;
            db.SaveChanges();
            return null;
        }
        public JsonResult Delete(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            var c = db.CATEGORIE.Find(id);
            db.CATEGORIE.Remove(c);
            db.SaveChanges();
            return null;
        }
        public JsonResult Delete2(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            var c = db.SOUSCATEGORIE.Find(id);
            db.SOUSCATEGORIE.Remove(c);
            db.SaveChanges();
            return null;
        }
        public JsonResult Details(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            var cat = db.CATEGORIE.Find(id);
            return Json(cat, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Details2(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            var scat = db.SOUSCATEGORIE.Find(id);
            return Json(scat, JsonRequestBehavior.AllowGet);
        }
    }
}
