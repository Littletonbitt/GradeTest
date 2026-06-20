namespace GradeBackend.Models;

public class TestAttempt
{
	public Guid Id { get; set; }
    	public Guid UserId { get; set; }
    	public Guid TestId { get; set; }
    	public int Score { get; set; }          
    	public int TotalQuestions { get; set; }
    	public DateTime CompletedAt { get; set; }
    	public string? AnswersJson { get; set; } 
}
