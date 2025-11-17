# -------------------------------------------------------------
# Low Carbon Energy Infrastructure Projects Analysis
# Author: Sustainability Analyst
# Objective: Identify which country is leading in project count
# -------------------------------------------------------------

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px

# Load dataset
# Step 1: Read raw text
with open("Low_carbon_energy_infrastructure_projects.csv", "r", encoding="latin1", errors="ignore") as f:
    lines = f.readlines()

# Step 2: Remove all quotation marks
cleaned_lines = [line.replace('"', '') for line in lines]

# Step 3: Save cleaned file
with open("cleaned.csv", "w", encoding="latin1") as f:
    f.writelines(cleaned_lines)

# Step 4: Read cleaned file with pandas
df = pd.read_csv("cleaned.csv", on_bad_lines='skip')

print(df.head())
print(df.columns)

# -------------------------------------------------------------
# CLEANING & PREPARATION
# -------------------------------------------------------------
# Standardize country column if needed
df['Country'] = df['Country'].str.strip()

# Count number of projects per country
country_counts = df['Country'].value_counts().reset_index()
country_counts.columns = ['Country', 'Project_Count']

# -------------------------------------------------------------
# STATIC VISUALIZATION (Matplotlib + Seaborn)
# -------------------------------------------------------------
plt.figure(figsize=(14, 8))
sns.set_theme(style="whitegrid")

# Create bar plot with an impactful palette
sns.barplot(
    data=country_counts,
    x="Project_Count",
    y="Country",
    palette="viridis"
)

plt.title("Number of Low-Carbon Energy Infrastructure Projects by Country",
          fontsize=16, weight='bold')
plt.xlabel("Number of Projects")
plt.ylabel("Country")
plt.tight_layout()
plt.show()

# -------------------------------------------------------------
# INTERACTIVE VISUALIZATION (Plotly)
# -------------------------------------------------------------
fig = px.bar(
    country_counts,
    x="Project_Count",
    y="Country",
    orientation='h',
    color="Project_Count",
    color_continuous_scale="Viridis",
    title="Interactive Visualization: Low-Carbon Projects by Country",
    labels={"Project_Count": "Number of Projects"}
)

fig.update_layout(
    title_font=dict(size=20),
    xaxis_title_font=dict(size=14),
    yaxis_title_font=dict(size=14),
    height=600,
)

fig.show()