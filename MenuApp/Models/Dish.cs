namespace MenuApp.Models{

    public class Dish{

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }

        public override string ToString(){
            return $"Title: {Title}, Description: {Description}";
        }

    }

}