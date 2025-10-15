def calculate_area(l, w):
    # This function calculates the area of a rectangle
    return l * w

def get_user_data(id):
    data = {
        1: {"name": "Alice", "age": 30},
        2: {"name": "Bob", "age": 24}
    }
    return data.get(id)

class MyClass:
    def __init__(self, val):
        self.v = val

    def process(self):
        if self.v > 10:
            print("Value is large")
        else:
            print("Value is small")

def main():
    length = 10
    width = 5
    area = calculate_area(length, width)
    print(f"Area: {area}")

    user = get_user_data(1)
    if user:
        print(f"User: {user["name"]}, Age: {user["age"]}")
    else:
        print("User not found")

    obj = MyClass(15)
    obj.process()

if __name__ == "__main__":
    main()
