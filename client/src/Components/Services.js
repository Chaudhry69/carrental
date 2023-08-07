import axios from 'axios';

class RecordService {
  async deleteRecord(id) {
    try {
      await axios.delete(`http://localhost:4000/api/records/deleteRecord/${id}`);
      console.log('Record Deleted Successfully!');
    } catch (error) {
      console.log('Error deleting record:', error);
    }
  }
}

export default RecordService;
