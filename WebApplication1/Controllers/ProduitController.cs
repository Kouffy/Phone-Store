using WebApplication1.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication1.Controllers
{
    public class ProduitController : Controller
    {
        // GET: Produit
        URBADBEntities db = new URBADBEntities();
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult AfficherProduit()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var produits = db.PRODUIT.ToList();
            return Json(produits, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AjouterProduit(PRODUIT pd, HttpPostedFileBase fichier)
        {
            db.Configuration.ProxyCreationEnabled = false;
            string chemin_sans_ext = Path.GetFileNameWithoutExtension(fichier.FileName);
            string FileExtension = Path.GetExtension(fichier.FileName);
            string nom_complet = chemin_sans_ext.Trim() + "_" + DateTime.Now.ToString("yy-mm-dd-mm-ss") + FileExtension;
            string path = Path.Combine(Server.MapPath("~/uploaded_images"), nom_complet);
            fichier.SaveAs(path);
            pd.imagep = nom_complet;
            db.PRODUIT.Add(pd);
            db.SaveChanges();
            return null;
        }
        [HttpPost]
        public JsonResult ModifierProduit(PRODUIT pd, HttpPostedFileBase fichier)
        {
            db.Configuration.ProxyCreationEnabled = false;
            db.Entry(pd).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return null;
        }
        public JsonResult ModifierProduitWithImage(PRODUIT pd, HttpPostedFileBase fichier)
        {
            System.IO.File.Delete("~/uploaded_images/" + pd.imagep);
            db.Configuration.ProxyCreationEnabled = false;
            string chemin_sans_ext = Path.GetFileNameWithoutExtension(fichier.FileName);
            string FileExtension = Path.GetExtension(fichier.FileName);
            string nom_complet = chemin_sans_ext.Trim() + "_" + DateTime.Now.ToString("yy-mm-dd-mm-ss") + FileExtension;
            string path = Path.Combine(Server.MapPath("~/uploaded_images"), nom_complet);
            fichier.SaveAs(path);
            db.Configuration.ProxyCreationEnabled = false;
            db.Entry(pd).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return null;
        }
        public JsonResult SupprimerProduit(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            var pd = db.PRODUIT.Find(id);
            db.PRODUIT.Remove(pd);
            db.SaveChanges();
            return null;
        }
        public JsonResult Details(int id)
        {
            db.Configuration.ProxyCreationEnabled = false;
            var pd = db.PRODUIT.Find(id);
            return Json(pd, JsonRequestBehavior.AllowGet);
        }
    }
}