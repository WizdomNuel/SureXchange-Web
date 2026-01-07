# SureXchange — Premium Currency Services

![SureXchange Banner](https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1200)

**SureXchange** is a modern, reliable, and AI-powered currency exchange platform. It serves as a seamless financial bridge between Nigeria and the global market, allowing users to exchange USD, GBP, EUR, and CNY to Naira, pay international bills, and manage global transfers.

*A subsidiary of **Eazify Innovation**.*

---

## 🚀 Features

### 💱 Premium Exchange Services
- **Instant Exchange:** Market-reflective rates for USD, GBP, EUR, and CNY to NGN.
- **Global Bill Payments:** Pay tuition, utilities, and taxes in the US, Europe, and Asia.
- **Real-time Calculator:** Estimate exchange values instantly with our interactive calculator.

### 🤖 AI-Powered Concierge (SureBot)
- **Intelligent Support:** Built with **Google Gemini 3 Flash**, providing 24/7 expert financial assistance.
- **Text-to-Speech (TTS):** Responses can be read aloud using high-fidelity neural voices.
- **Voice Recognition:** Send voice notes to the bot or use the "Hey SureBot" wake word for hands-free interaction.

### 🎙️ SureVoice (Live Assistant)
- **Real-time Audio:** Engage in a natural, low-latency voice conversation using the **Gemini Live API**.
- **Multimodal Interaction:** The assistant understands audio context and provides human-like spoken responses.

### 🔐 Secure Infrastructure
- **Authentication:** Managed by **Supabase Auth** for secure, encrypted user access.
- **User Profiles:** Personalized dashboards for managing activity and account settings.
- **Dark Mode:** Fully optimized UI for both light and dark environments.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS
- **Icons:** Lucide React
- **AI Backend:** Google GenAI SDK (Gemini API)
- **Database & Auth:** Supabase (PostgreSQL)
- **Routing:** React Router 7

---

## ⚙️ Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/sure-xchange.git
cd sure-xchange
```

### 2. Environment Variables
Create a `.env` file or set the following in your execution context:

| Variable | Description |
| :--- | :--- |
| `API_KEY` | Your Google Gemini API Key |
| `SUPABASE_URL` | Your Supabase Project URL |
| `SUPABASE_ANON_KEY` | Your Supabase Public/Anon Key |

### 3. Supabase Database Setup
Run the following SQL in your Supabase SQL Editor to initialize the user profiles table:

```sql
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  avatar_url text,
  preferred_currency text default 'USD'
);

-- Enable RLS
alter table profiles enable row level security;

-- Policies
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update their own profile." on profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

---

## 📈 Roadmap
- [ ] Integration with real-time Banking APIs for automated payouts.
- [ ] Multi-factor Authentication (MFA).
- [ ] Transaction history export (PDF/CSV).
- [ ] Mobile Application (React Native).

## 📄 License
This project is licensed under the MIT License.

---

Developed with ❤️ by **Wisdom Nuel**.
