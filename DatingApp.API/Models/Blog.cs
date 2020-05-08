using System;

namespace DatingApp.API.Models
{
    public class Blog
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string DisplayPhoto { get; set; }
        public DateTime Date { get; set; }

        public virtual User User { get; set; }
        public int UserId { get; set; }
    }
}