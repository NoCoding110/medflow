import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Circle, CheckCircle, Edit2, Trash2 } from "lucide-react";
import { getDoctorByEmail } from "@/lib/services/doctor-service";

function isToday(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const now = new Date();
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
}
function isOverdue(dateStr, completed) {
  if (!dateStr || completed) return false;
  return new Date(dateStr) < new Date();
}
function isUpcoming(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const now = new Date();
  return d > now && !isToday(dateStr);
}

const priorityColors = {
  low: "bg-green-200 text-green-800",
  medium: "bg-yellow-200 text-yellow-800",
  high: "bg-red-200 text-red-800"
};

interface Reminder {
  id: string;
  doctor_id: string;
  patient_id: string;
  content: string;
  created_at: string;
  patients?: {
    id: string;
    first_name: string;
    last_name: string;
  };
}

const RemindersPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editReminder, setEditReminder] = useState<any>(null);
  const [newReminder, setNewReminder] = useState('');
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [error, setError] = useState<string | null>(null);
  const [remindersRefresh, setRemindersRefresh] = useState(0);
  const [selectedPatientId, setSelectedPatientId] = useState('');

  const fetchReminders = useCallback(async () => {
    setLoading(true);
    try {
      // Get the doctor's ID from the users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('id', user?.id)
        .eq('role', 'doctor')
        .single();

      if (userError) throw userError;
      if (!userData) throw new Error('Doctor profile not found');

      const { data, error } = await supabase
        .from('doctor_reminders')
        .select(`
          *,
          patients (
            id,
            first_name,
            last_name
          )
        `)
        .eq('doctor_id', userData.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReminders(data || []);
    } catch (error) {
      console.error('Error fetching reminders:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch reminders. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }, [user?.id, toast]);

  useEffect(() => {
    fetchReminders();
  }, [fetchReminders]);

  function groupReminders(reminders) {
    const today = [], upcoming = [], completed = [];
    reminders.forEach(r => {
      if (r.completed) completed.push(r);
      else if (isToday(r.due_date)) today.push(r);
      else if (isUpcoming(r.due_date)) upcoming.push(r);
      else today.push(r); // no due date or overdue
    });
    return { today, upcoming, completed };
  }

  function filterReminders(reminders) {
    let filtered = reminders;
    if (search) {
      filtered = filtered.filter(r =>
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        (r.description && r.description.toLowerCase().includes(search.toLowerCase()))
      );
    }
    if (filter !== "all") {
      filtered = filtered.filter(r => r.priority === filter);
    }
    if (visibilityFilter !== "all") {
      filtered = filtered.filter(r => r.visibility === visibilityFilter);
    }
    return filtered;
  }

  const handleAddReminder = async () => {
    if (!newReminder.trim()) return;

    try {
      // First get the doctor's ID from the doctors table
      const { data: doctorData, error: doctorError } = await supabase
        .from('doctors')
        .select('id')
        .eq('user_id', user?.id)
        .single();

      if (doctorError) throw doctorError;
      if (!doctorData) throw new Error('Doctor profile not found');

      const { error } = await supabase
        .from('doctor_reminders')
        .insert([
          {
            doctor_id: doctorData.id,
            patient_id: selectedPatientId,
            content: newReminder,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      setNewReminder('');
      setSelectedPatientId('');
      fetchReminders();
      toast({
        title: "Success",
        description: "Reminder added successfully.",
      });
    } catch (error) {
      console.error('Error adding reminder:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add reminder. Please try again later.",
      });
    }
  };

  const handleEditReminder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editReminder) return;
    const { error } = await supabase.from("reminders").update({
      ...editReminder,
      due_date: editReminder.due_date ? new Date(editReminder.due_date).toISOString() : null
    }).eq("id", editReminder.id);
    setShowEdit(false);
    setEditReminder(null);
    setRemindersRefresh(r => r + 1);
    toast({ title: "Reminder updated" });
  };

  const handleToggleComplete = async (reminder: any) => {
    await supabase.from("reminders").update({ completed: !reminder.completed }).eq("id", reminder.id);
    setRemindersRefresh(r => r + 1);
    toast({ title: reminder.completed ? "Marked as incomplete" : "Marked as complete" });
  };

  const handleDelete = async (reminder: any) => {
    await supabase.from("reminders").delete().eq("id", reminder.id);
    setRemindersRefresh(r => r + 1);
    toast({ title: "Reminder deleted" });
  };

  const grouped = groupReminders(filterReminders(reminders));

  if (error) {
    return <div className="container py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="container py-8">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <CardTitle>Reminders</CardTitle>
            <Input
              placeholder="Search reminders..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="ml-4 w-48"
            />
            <select
              className="ml-2 border rounded px-2 py-1"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select
              className="ml-2 border rounded px-2 py-1"
              value={visibilityFilter}
              onChange={e => setVisibilityFilter(e.target.value)}
            >
              <option value="all">All Visibility</option>
              <option value="private">Private</option>
              <option value="shared">Shared</option>
            </select>
          </div>
          <Button onClick={() => setShowAdd(true)} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add Reminder
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : reminders.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-muted-foreground">
              <span className="text-6xl mb-2">🔔</span>
              <div className="text-lg font-semibold mb-1">No reminders yet</div>
              <div>Add your first reminder to get started!</div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Today */}
              {grouped.today.length > 0 && (
                <div>
                  <div className="font-semibold text-lg mb-2">Today & Overdue</div>
                  <ul className="divide-y">
                    {grouped.today.map(reminder => (
                      <ReminderItem
                        key={reminder.id}
                        reminder={reminder}
                        onToggleComplete={handleToggleComplete}
                        onDelete={handleDelete}
                        onEdit={() => { setEditReminder({ ...reminder, due_date: reminder.due_date ? reminder.due_date.slice(0, 16) : "" }); setShowEdit(true); }}
                      />
                    ))}
                  </ul>
                </div>
              )}
              {/* Upcoming */}
              {grouped.upcoming.length > 0 && (
                <div>
                  <div className="font-semibold text-lg mb-2">Upcoming</div>
                  <ul className="divide-y">
                    {grouped.upcoming.map(reminder => (
                      <ReminderItem
                        key={reminder.id}
                        reminder={reminder}
                        onToggleComplete={handleToggleComplete}
                        onDelete={handleDelete}
                        onEdit={() => { setEditReminder({ ...reminder, due_date: reminder.due_date ? reminder.due_date.slice(0, 16) : "" }); setShowEdit(true); }}
                      />
                    ))}
                  </ul>
                </div>
              )}
              {/* Completed */}
              {grouped.completed.length > 0 && (
                <div>
                  <div className="font-semibold text-lg mb-2">Completed</div>
                  <ul className="divide-y opacity-70">
                    {grouped.completed.map(reminder => (
                      <ReminderItem
                        key={reminder.id}
                        reminder={reminder}
                        onToggleComplete={handleToggleComplete}
                        onDelete={handleDelete}
                        onEdit={() => { setEditReminder({ ...reminder, due_date: reminder.due_date ? reminder.due_date.slice(0, 16) : "" }); setShowEdit(true); }}
                      />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Reminder Dialog */}
      {showAdd && (
        <ReminderDialog
          title="Add Reminder"
          reminder={newReminder}
          setReminder={setNewReminder}
          onClose={() => setShowAdd(false)}
          onSubmit={handleAddReminder}
          loading={adding}
        />
      )}
      {/* Edit Reminder Dialog */}
      {showEdit && (
        <ReminderDialog
          title="Edit Reminder"
          reminder={editReminder}
          setReminder={setEditReminder}
          onClose={() => { setShowEdit(false); setEditReminder(null); }}
          onSubmit={handleEditReminder}
          loading={false}
        />
      )}
    </div>
  );
};

function ReminderItem({ reminder, onToggleComplete, onDelete, onEdit }) {
  const overdue = isOverdue(reminder.due_date, reminder.completed);
  return (
    <li className="flex items-center py-3 group">
      <button
        className="mr-3 text-lightblue-600 hover:text-lightblue-800"
        onClick={() => onToggleComplete(reminder)}
        title={reminder.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        {reminder.completed ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
      </button>
      <div className="flex-1 min-w-0">
        <div className={reminder.completed ? "line-through text-muted-foreground" : "font-medium flex items-center gap-2"}>
          {reminder.title}
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${priorityColors[reminder.priority]}`}>{reminder.priority}</span>
          {overdue && <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 animate-pulse">Overdue</span>}
          <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${reminder.visibility === 'private' ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-700'}`}>
            {reminder.visibility === 'private' ? 'Private' : 'Shared'}
          </span>
        </div>
        {reminder.description && <div className="text-xs text-navy-500 truncate">{reminder.description}</div>}
        {reminder.due_date && <div className="text-xs text-navy-400">Due: {new Date(reminder.due_date).toLocaleString()}</div>}
      </div>
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" onClick={onEdit} title="Edit">
          <Edit2 className="h-4 w-4 text-blue-500" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(reminder)} title="Delete">
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </li>
  );
}

function ReminderDialog({ title, reminder, setReminder, onClose, onSubmit, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <form onSubmit={onSubmit} className="space-y-3">
          <Input
            placeholder="Title"
            value={reminder.title}
            onChange={e => setReminder({ ...reminder, title: e.target.value })}
            required
          />
          <Input
            placeholder="Description (optional)"
            value={reminder.description}
            onChange={e => setReminder({ ...reminder, description: e.target.value })}
          />
          <Input
            type="datetime-local"
            value={reminder.due_date}
            onChange={e => setReminder({ ...reminder, due_date: e.target.value })}
          />
          <select
            className="w-full border rounded px-2 py-1"
            value={reminder.priority}
            onChange={e => setReminder({ ...reminder, priority: e.target.value })}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Visibility</label>
            <select
              className="border rounded px-2 py-1"
              value={reminder.visibility || 'private'}
              onChange={e => setReminder({ ...reminder, visibility: e.target.value })}
            >
              <option value="private">Private</option>
              <option value="shared">Shared with Patient</option>
            </select>
          </div>
          <Button type="submit" disabled={loading} className="w-full mt-2">
            {loading ? "Saving..." : title}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default RemindersPage; 