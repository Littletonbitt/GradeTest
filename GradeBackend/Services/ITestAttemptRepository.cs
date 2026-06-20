using GradeBackend.Models;

namespace GradeBackend.Services;

public interface ITestAttemptRepository
{
	Task AddAttempt(TestAttempt attempt);
    	Task<IEnumerable<TestAttempt>> GetAttemptsByUser(Guid userId);
    	Task<IEnumerable<TestAttempt>> GetAttemptsByTest(Guid testId);
}
