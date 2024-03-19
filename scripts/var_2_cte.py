import numpy as np
import csv

file = "data_raw.csv"

t = []
y = []
count = 0
# Read the data from the CSV file
with open(file, "r") as csvfile:
    reader = csv.reader(csvfile)
    for row in reader:
        if(count != 0):
            t.append(float(row[0]))
            y.append(float(row[1]))
        count += 1

t = np.array(t)
y = np.array(y)

time_step_desired_ms = 100  
num_points_new = int((t[-1] - t[0]) * 1000 / time_step_desired_ms) + 1
print(num_points_new)
t_new = np.linspace(t[0], t[-1], num=num_points_new)
y_new = np.interp(t_new, t, y)
file_cdt = "data.csv"
with open(file_cdt, "w", newline='') as csvfile:
    writer = csv.writer(csvfile)
    for i in range(len(t_new)):
        writer.writerow([t_new[i], y_new[i]])

print("Interpolation and writing to file completed successfully.")
