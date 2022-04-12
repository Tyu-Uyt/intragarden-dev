def fibb(length):
    seq = [0, 1]
    [seq.append(seq[-1] + seq[-2]) for _ in range(length)]
    return seq

seq = fibb(100)


