namespace GradeBackend.Models;

public class Test
{
	public Guid Id { get; set; }
    	public string Title { get; set; } = string.Empty;
    	public Guid OwnerId { get; set; }
    	public User Owner { get; set; } = null!;
    	public DateTime CreatedAt { get; set; }
    	public List<Question> Questions { get; set; } = new();
}

