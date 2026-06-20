import { useParams } from 'react-router-dom';
import TestCreation from './TestCreation';

export default function TestEditWrapper() {
	const { testId } = useParams();
	return <TestCreation editTestId={testId} />;
}
