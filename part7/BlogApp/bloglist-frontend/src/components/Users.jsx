import { Link } from 'react-router-dom'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Container,
} from '@mui/material'

const Users = ({ users }) => {
  if (!users) return <Typography>Loading...</Typography>

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
          Users
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.id}</TableCell>
                <TableCell>
                  <Link
                    to={`/users/${u.id}`}
                    style={{ textDecoration: 'none', color: '#2563eb' }}
                  >
                    {u.name}
                  </Link>
                </TableCell>
                <TableCell>{u.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  )
}

export default Users
