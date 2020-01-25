using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class MessengerController : Controller
    {
        URBADBEntities db = new URBADBEntities();
        // GET: Messenger
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult AfficherMSG()
        {
            var msgs = db.MESSENGER.ToList();
            return Json(msgs, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult AjouterMSG(MESSENGER msg)
        {
            db.MESSENGER.Add(msg);
            db.SaveChanges();
            return null;
        }
        public JsonResult DeleteMSG(int id)
        {
            var c = db.MESSENGER.Find(id);
            db.MESSENGER.Remove(c);
            db.SaveChanges();
            return null;
        }
    }
}