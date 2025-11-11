import { Paper, Typography, List, ListItem, Container } from '@mui/material'

const User = ({ user }) => {
  if (!user) return <Typography>Loading...</Typography>

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          {user.username}
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Blogs
        </Typography>
        <List>
          {user.blogs.map((b) => (
            <ListItem key={b.id}>{b.title}</ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  )
}

export default User
