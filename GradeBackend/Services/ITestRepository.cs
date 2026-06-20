using GradeBackend.Models;

namespace GradeBackend.Services;

public interface ITestRepository
{
	Task<Test?> GetTestById(Guid id);
	Task<IEnumerable<Test>> GetTestsByOwner(Guid ownerId);
	Task CreateTest(Test test);
	Task UpdateTest(Test test);
	Task DeleteTest(Guid id);
	Task<IEnumerable<Test>> GetAllTests();

}
