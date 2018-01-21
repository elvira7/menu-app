using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using MenuApp.Models;

namespace CookBookApp.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    public class DishesController : Controller
    {
        // GET api/values
        [HttpGet]
        public XElement Get()
        {   
            XElement dishesXML = XElement.Load("xml/dishes.xml");
            return dishesXML;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public XElement Get(int id)
        {   
            
            XElement dishesXML =  XElement.Load("xml/dishes.xml");
            return dishesXML;
        }

        // POST api/dish
        [HttpPost]
        public IActionResult Post([FromBody]Dish newDish)
        {
           try{
               XElement dishesXML = XElement.Load("xml/dishes.xml");

               XElement newDishXML = new XElement(
                   "dish", 
                   new XElement("id", newDish.Id),
                   new XElement("title", newDish.Title),
                   new XElement("description", newDish.Description),
                   new XElement("category", newDish.Category)
               );

               dishesXML.Add(newDishXML);
               dishesXML.Save("xml/dishes.xml");

               return Created("api/dish/post", newDish);
           }
           catch{
               return StatusCode(500);
           }
        }

        // PUT api/values/5
        [HttpPut]
        public void Put(int id, [FromBody]Dish putDish)
        {
            // 1. koble til DB
            XElement dishesXML = XElement.Load("xml/dishes.xml");

            // 2. få tak i elementen
            XElement dishToChange = (from dish in dishesXML.Descendants("dish")
                                            where (int)dish.Element("id") == putDish.Id
                                            select dish).SingleOrDefault();
            

            //3. Gjøre endringer
             dishToChange.SetElementValue("title", putDish.Title);
             dishToChange.SetElementValue("description", putDish.Description);
             dishToChange.SetElementValue("category", putDish.Category);


            //4. Lagre endringer

           dishesXML.Save("xml/dishes.xml");
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            //Koble til DB
            XElement dishesXML = XElement.Load("xml/dishes.xml");
            // Få tak i et element
            XElement dishToDelete = (from dish in dishesXML.Descendants("dish")
                                            where (int)dish.Element("id") ==  id
                                            select dish).SingleOrDefault();
            //Fjerne element
            dishToDelete.Remove();
            //Lagre
            dishesXML.Save("xml/dishes.xml");
        }
    }
}
