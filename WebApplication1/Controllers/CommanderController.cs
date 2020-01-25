using WebApplication1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace WebApplication1.Controllers
{
    public class CommanderController : Controller
    {
        URBADBEntities db = new URBADBEntities();
        // GET: Commander
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult Create(COMMAND cmd)
        {

            db.Configuration.ProxyCreationEnabled = false;
            cmd.datecmd = DateTime.Now;
            db.COMMAND.Add(cmd);
            db.SaveChanges();
            return null;
        }

    }
}