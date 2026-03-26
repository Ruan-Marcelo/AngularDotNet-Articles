namespace Central_de_Artigos.Models
{
    // Developed by Ruan Marcelo
    // GitHub: https://github.com/seu-usuario
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class CentralArtigosEntities : DbContext
    {
        public CentralArtigosEntities()
            : base("name=CentralArtigosEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Appuser> Appusers { get; set; }
        public virtual DbSet<Categoria> Categorias { get; set; }
        public virtual DbSet<Artigos> Artigos { get; set; }
    }
}
