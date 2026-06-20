namespace GradeBackend.Models;

public class Question
{
	public Guid Id { get; set; }
    	public string Text { get; set; } = string.Empty;
    	public bool IsMultiple { get; set; }
    	public Guid TestId { get; set; }
    	public Test Test { get; set; } = null!;
    	public List<Answer> Answers { get; set; } = new();
}
