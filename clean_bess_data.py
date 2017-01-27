import math

counter = 0
with open("./Development/data_toclean.txt", "r") as ins:
    tmp = []
    for line in ins:
        print "WOW: ", line
        if line.strip() == "":
            print counter
            # edit data
            line1 = tmp[0].split(" ")
            new_name = line1[0]+"a"
            line1[0] = new_name
            
            line11 = tmp[11].split(" ")
            print line11
            infos = line11[-1].split("_")
            
            elevation = int(infos[1])
            angle = int(infos[2][0:2])

            direction = infos[2][-1]

            line8 = tmp[8].split(",")
            x_cur = float(line8[0].split("(")[1])
            z_cur = float(line8[1])
            y_cur = float(line8[2].split(")")[0])

            angle = 90 - angle
            if direction == "e":
                x = x_cur - (math.cos(math.radians(angle)) * (0.5 * math.cos(math.radians(elevation))))
            else:
                x = x_cur + (math.cos(math.radians(angle)) * (0.5 * math.cos(math.radians(elevation))))
            y = y_cur - (math.sin(math.radians(angle)) * (0.5 * math.cos(math.radians(elevation))))
            z = (elevation / 15 * 0.1) + z_cur


            print x_cur, z_cur, y_cur
            print new_name, elevation, angle, direction
            
            tmp[0] = " ".join(line1)
            line8_string = tmp[8]
            line8_string = new_name + line8_string[5:19] + ("%.3f" % x) + "," + " " + ("%.1f" % z) + "," + " " + ("%.3f" % y) + ");"
            tmp[8] = line8_string
            tmp[9] = new_name + tmp[9][5:]
            tmp[10] = new_name + tmp[10][5:]
            tmp[11] = new_name + tmp[11][5:28] + '01";'
            tmp[12] = tmp[12][0:10] + new_name + ");"

            tmp.pop()
            tmp.pop()
            with open("./Development/cleaned.txt", "a") as myfile:
                for item in tmp:
                    myfile.write(item+"\n")
                myfile.write("\n")
            tmp = []
            counter += 1
            #if counter > 1:
            #break
        else:
            tmp.append(line.strip())


