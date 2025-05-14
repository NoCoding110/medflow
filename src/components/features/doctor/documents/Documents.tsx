import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';

interface Document {
  id: string;
  name: string;
  type: string;
  patientId: string;
  patientName: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
}

const Documents: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [newDocument, setNewDocument] = useState<Partial<Document>>({
    name: '',
    type: '',
    patientId: '',
    notes: '',
  });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const response = await fetch('/api/documents');
      const data = await response.json();
      setDocuments(data);
    } catch (err) {
      setError('Failed to fetch documents');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (document?: Document) => {
    if (document) {
      setSelectedDocument(document);
      setNewDocument(document);
    } else {
      setSelectedDocument(null);
      setNewDocument({
        name: '',
        type: '',
        patientId: '',
        notes: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDocument(null);
    setNewDocument({
      name: '',
      type: '',
      patientId: '',
      notes: '',
    });
  };

  const handleSaveDocument = async () => {
    try {
      if (selectedDocument) {
        // TODO: Replace with actual API call
        await fetch(`/api/documents/${selectedDocument.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newDocument),
        });
      } else {
        // TODO: Replace with actual API call
        await fetch('/api/documents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newDocument),
        });
      }
      fetchDocuments();
      handleCloseDialog();
    } catch (err) {
      setError('Failed to save document');
      console.error(err);
    }
  };

  const handleDeleteDocument = async (id: string) => {
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/documents/${id}`, {
        method: 'DELETE',
      });
      fetchDocuments();
    } catch (err) {
      setError('Failed to delete document');
      console.error(err);
    }
  };

  const handleDownload = async (id: string) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/documents/${id}/download`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = documents.find(doc => doc.id === id)?.name || 'document';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('Failed to download document');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Documents
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Document
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Upload Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((document) => (
              <TableRow key={document.id}>
                <TableCell>{document.name}</TableCell>
                <TableCell>{document.type}</TableCell>
                <TableCell>{document.patientName}</TableCell>
                <TableCell>{new Date(document.uploadDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip
                    label={document.status}
                    color={
                      document.status === 'approved'
                        ? 'success'
                        : document.status === 'rejected'
                        ? 'error'
                        : 'warning'
                    }
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleDownload(document.id)}
                    title="Download"
                  >
                    <DownloadIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog(document)}
                    title="Edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteDocument(document.id)}
                    title="Delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedDocument ? 'Edit Document' : 'Add New Document'}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Document Name"
              value={newDocument.name}
              onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
              fullWidth
            />
            <TextField
              select
              label="Document Type"
              value={newDocument.type}
              onChange={(e) => setNewDocument({ ...newDocument, type: e.target.value })}
              fullWidth
            >
              <MenuItem value="medical_report">Medical Report</MenuItem>
              <MenuItem value="lab_result">Lab Result</MenuItem>
              <MenuItem value="prescription">Prescription</MenuItem>
              <MenuItem value="imaging">Imaging</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
            <TextField
              label="Patient ID"
              value={newDocument.patientId}
              onChange={(e) => setNewDocument({ ...newDocument, patientId: e.target.value })}
              fullWidth
            />
            <TextField
              label="Notes"
              value={newDocument.notes}
              onChange={(e) => setNewDocument({ ...newDocument, notes: e.target.value })}
              multiline
              rows={4}
              fullWidth
            />
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadIcon />}
              fullWidth
            >
              Upload File
              <input type="file" hidden />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveDocument} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Documents; 