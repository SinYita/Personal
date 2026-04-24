---
id: riscv
title: RISC-V Processor on FPGA board
description: >-
  This is my course work for Introduction to Hardware Design and Tools. Where I
  implemented  from single cycle, multi-cycle to pipeline processor. It's a 32
  bit processor which supports the main instruction sets of RISCV, and later
  they are deployed to FPGA board, where I achieved communication between
  different components using a AXI4 bus approach.
techStack:
  - RISCV
  - FPGA
  - Verilog
  - VHDL
tags:
  - Processors
github: 'https://github.com/SinYita/riscv-single'
demo: ''
featured: true
date: '2025.02'
---
# RISC-V Pipeline CPU

A complete implementation of a 32-bit 5-stage pipelined RISC-V processor in Verilog, supporting a subset of the RV32I base instruction set. This project implements a classic pipeline architecture with hazard detection, data forwarding, and control hazard handling for improved performance over single-cycle designs.

## Overall Architecture

[![CPU Top-Level Design](assets/Pipeline_CPU.drawio.svg "Pipeline CPU Overview Structure")](https://drive.google.com/file/d/12BUPjiEC0sqt7dbd2dKK5I7y6zKHU6oa/view?usp=drive_link)

\*Figure: Complete 5-stage pipelined CPU architecture showing all major components, pipeline registers, and data paths\*

## Supported Instructions

The CPU implements the following RV32I instructions:

\*\*R-type: \`ADD\`, \`SUB\`, \`AND\`, \`OR\`, \`XOR\`, \`SLL\`, \`SRL\`, \`SRA\`, \`SLT\`, \`SLTU\`

- \*\*I-type\*\*: \`ADDI\`, \`ANDI\`, \`ORI\`, \`XORI\`, \`SLLI\`, \`SRLI\`, \`SRAI\`, \`SLTI\`, \`SLTIU\`
- \*\*Load\*\*: \`LW\` (Load Word)
- \*\*Store\*\*: \`SW\` (Store Word)
- \*\*Branch\*\*: \`BEQ\` (Branch if Equal)
- \*\*Jump\*\*: \`JAL\` (Jump and Link)
- \*\*U-type\*\*: \`LUI\` (Load Upper Immediate)

## Getting Started

### Prerequisites

- \*\*Icarus Verilog\*\* (iverilog): For compilation and simulation
- \*\*GTKWave\*\*: For waveform viewing (optional)

Install on Ubuntu/Debian:

\`\`\`bash

sudo apt-get install iverilog gtkwave

\`\`\`

### Running the Testbench

The main testbench simulates the complete pipeline with a comprehensive test program:

\`\`\`bash

# Compile the pipeline design

iverilog -o tb.vpp Pipeline_top_tb.v Pipeline_top.v Datapath.v Controller.v \

         Hazard_Unit.v Op_Decoder.v ALU_Decoder.v ALU.v Register_File.v \

         Instruction_Memory.v Data_Memory.v Sign_Extend.v Mux.v flops.v

# Run simulation

vvp tb.vpp

# View waveform (optional)

gtkwave rv_pl_sim.vcd

\`\`\`

### Test Program

The [assembly/test.s](assembly/test.s) file contains a comprehensive test program that exercises:

- All arithmetic and logic instructions
- Load/store operations
- Conditional branches
- Jump instructions
- Data hazards requiring forwarding
- Load-use hazards requiring stalls
- Control hazards

Expected final results:

- \`x2 = 25\` (0x19)
- \`x9 = 18\` (0x12)
- Memory[100] = 25 (0x19)

## CPU Architecture

The pipelined CPU follows a classic 5-stage pipeline design with hazard detection and forwarding:

### Pipeline Stages

The processor implements the following five pipeline stages:

1. \*\*Fetch (F)\*\*: PC → Instruction Memory → Instruction

- Fetches instruction from instruction memory
- Computes PC+4 for next instruction

2. \*\*Decode (D)\*\*: Instruction → Controller → Control Signals

- Decodes instruction and generates control signals
- Reads source operands from register file
- Performs immediate extension

3. \*\*Execute (E)\*\*: ALU performs operation

- Selects ALU operands (with forwarding)
- Performs ALU operation
- Computes branch/jump target address
- Determines branch taken/not taken

4. \*\*Memory (M)\*\*: Load/Store access Data Memory

- Accesses data memory for load/store instructions
- Passes through ALU result for non-memory instructions

5. \*\*Write Back (W)\*\*: Result written to Register File

- Selects result source (ALU, Memory, or PC+4)
- Writes result back to register file

### Pipeline Registers

The design uses pipeline registers between each stage to hold intermediate results:

- **F/D Register**: Holds instruction and PC
- \*\*D/E Register\*\*: Holds decoded control signals, operands, and immediate
- \*\*E/M Register\*\*: Holds ALU result, memory write data, and destination register
- \*\*M/W Register\*\*: Holds memory read data, ALU result, and destination register

### Hazard Detection and Forwarding

The pipeline implements comprehensive hazard handling:

\*\*Data Hazard Unit\*\* ([Hazard_Unit.v](Hazard_Unit.v)):

The Hazard Unit detects and resolves data hazards through:

1. \*\*Data Forwarding (Bypassing)\*\*:

- Forwards ALU results from Memory stage (M → E)
- Forwards write-back data from Write-back stage (W → E)
- Uses 2-bit forward select signals (\`E_fd_A\`, \`E_fd_B\`)
- Eliminates most pipeline stalls for data dependencies

2. \*\*Load-Use Hazard Detection\*\*:

- Detects when Execute stage needs data being loaded in current cycle
- Stalls pipeline (F and D stages) for one cycle
- Inserts bubble (flush) in Execute stage

3. \*\*Control Hazard Handling\*\*:

- Branch resolution occurs in Execute stage
- Flushes Decode stage on branch taken
- Flushes Execute stage on control transfer
- Two-cycle penalty for taken branches/jumps

The forwarding logic prioritizes the most recent data:

\`\`\`

Priority: M stage > W stage > Normal register read

\`\`\`

\*\*Pipelined Control Signals\*\*:

- Control signals propagate through pipeline registers (D → E → M → W)
- Execute stage can flush control signals for hazard handling
- Memory and Write-back stages use registered control signals

\*\*Branch Detection\*\*: Branch equality (\`BEQ\`) is implemented by comparing ALU zero flag. When operands are equal, ALU subtraction produces zero. The \`JAL\` instruction sets jump signal directly.

## Pipeline Performance

\*\*Ideal CPI\*\*: 1.0 (one instruction completed per cycle after pipeline fills)

\*\*Pipeline Penalties\*\*:

- Load-use hazard: 1 cycle stall
- Branch taken: 2 cycle penalty (flush D and E stages)
- Jump: 2 cycle penalty (flush D and E stages)

\*\*Throughput\*\*: Up to 5x improvement over single-cycle design for programs without hazards.

## Reset Behavior

- \*\*Reset Signal\*\*: Active-low (\`rst_n = 0\` activates reset)
- \*\*PC Reset\*\*: Clears to \`0x00000000\`
- \*\*Registers\*\*: All register file entries cleared to zero
- \*\*Pipeline Registers\*\*: All pipeline registers cleared
- \*\*Memory\*\*: Instruction memory loaded from machine code file

## Memory Map

- \*\*Instruction Memory\*\*: 0x00000000 - 0x00000FFF (4KB, 1024 words)
- \*\*Data Memory\*\*: 0x00000000 - 0x00000FFF (4KB, 1024 words)

Note: Instruction and data memories are separate (Harvard architecture).

## Key Design Features

### 1. Harvard Architecture

Separate instruction and data memories eliminate structural hazards and allow simultaneous fetch and memory access.

### 2. Data Forwarding Network

Comprehensive forwarding paths reduce pipeline stalls:

- M → E forwarding (most common case)
- W → E forwarding (for back-to-back dependencies)
- Automatic priority resolution in multiplexers

### 3. Hazard Detection Unit

Dedicated hardware module detects:

- Load-use data hazards
- Control hazards (branches/jumps)
- Register dependencies across pipeline stages

### 4. Pipeline Control

Pipeline control signals propagate through dedicated registers:

- Decode stage generates all control signals
- Control signals flow through E, M, W stages
- Selective flushing for hazard resolution

### 5. Modular Design

Clean separation of concerns:

- [Pipeline_top.v](Pipeline_top.v): Top-level module integrating all components
- [Datapath.v](Datapath.v): Pipeline registers and data paths
- [Controller.v](Controller.v): Pipelined control unit
- [Hazard_Unit.v](Hazard_Unit.v): Hazard detection and forwarding control
- [ALU.v](ALU.v), [Register_File.v](Register_File.v), [Data_Memory.v](Data_Memory.v): Functional units

## Project Structure

The project is organized with the following key components:

- \*\*Core Pipeline Modules\*\*: [Pipeline_top.v](Pipeline_top.v), [Datapath.v](Datapath.v), [Controller.v](Controller.v), [Hazard_Unit.v](Hazard_Unit.v)
- \*\*Functional Units\*\*: [ALU.v](ALU.v), [Register_File.v](Register_File.v), [Instruction_Memory.v](Instruction_Memory.v), [Data_Memory.v](Data_Memory.v)
- \*\*Supporting Modules\*\*: [Op_Decoder.v](Op_Decoder.v), [ALU_Decoder.v](ALU_Decoder.v), [Sign_Extend.v](Sign_Extend.v), [Mux.v](Mux.v), [flops.v](flops.v)
- \*\*Configuration\*\*: [define.v](define.v) - Macro definitions for opcodes and control signals
- \*\*Testing\*\*: [Pipeline_top_tb.v](Pipeline_top_tb.v), [Module_tb.v](Module_tb.v), [assembly/test.s](assembly/test.s)

## Known Limitations

1. \*\*Single Branch/Jump Support\*\*: Only \`BEQ\` and \`JAL\` implemented

- Future: Add \`BNE\`, \`BLT\`, \`BGE\`, \`JALR\`

2. \*\*No Branch Prediction\*\*: All branches resolved in Execute stage

- Future: Add static or dynamic branch prediction

3. \*\*Memory Alignment\*\*: Assumes word-aligned memory accesses

- No byte/halfword load/store support

4. \*\*Single Port Register File\*\*: Register file written on negative clock edge

- Prevents same-cycle write and read conflicts

## Extending the Design

To add new instructions:

1. \*\*Update Macro Definitions\*\* ([define.v](define.v))

- Add new opcode or function code definitions

2. \*\*Modify Decoders\*\*

- Update [Op_Decoder.v](Op_Decoder.v) for new instruction types
- Update [ALU_Decoder.v](ALU_Decoder.v) for new ALU operations

3. \*\*Implement ALU Operations\*\* ([ALU.v](ALU.v))

- Add new operation cases to ALU

4. \*\*Update Hazard Detection\*\* (if needed)

- Modify [Hazard_Unit.v](Hazard_Unit.v) for new hazard patterns

5. \*\*Add Testbenches\*\*

- Create assembly test programs in [assembly/](assembly/)
- Verify with [Pipeline_top_tb.v](Pipeline_top_tb.v)

## Acknowledgments

This project is based on the RISC-V ISA specification and classic 5-stage pipeline CPU design patterns. The implementation follows educational CPU design principles while maintaining compatibility with the RISC-V instruction encoding format. The hazard detection and forwarding mechanisms are based on standard pipeline optimization techniques from computer architecture literature.

## Additional Resources

- [RISC-V ISA Specification](https://riscv.org/technical/specifications/)
- Detailed design documentation with pipeline diagrams available in the repository
- Comprehensive testbenches for all modules
- Sample assembly programs demonstrating hazard scenarios in [assembly/test.s](assembly/test.s)

<!-- AUTO-GENERATED:README:START -->
## README (Synced)

Source: [SinYita/riscv-single](https://github.com/SinYita/riscv-single)

# RISC-V Single Cycle CPU

A complete implementation of a 32-bit single-cycle RISC-V processor in Verilog, supporting a subset of the RV32I base instruction set. This project focuses on essential components including the controller, immediate extension unit, ALU interface, and next-PC logic.


## Project Structure

```
riscv-single/
├── src/                          # Verilog source files
├── testbench/                    # Testbench files
├── assembly/                     # Assembly programs and machine code
├── assets/                       # Documentation assets
├── compiler_helper.py            # Automated compilation tool
└── README.md                     # This file
```

## Supported Instructions

The CPU implements the following RV32I instructions:

### Arithmetic & Logic
- **R-type**: `ADD`, `SUB`, `AND`, `OR`, `XOR`, `SLL`, `SRL`, `SRA`, `SLT`, `SLTU`
- **I-type**: `ADDI`, `ANDI`, `ORI`, `XORI`, `SLLI`, `SRLI`, `SRAI`, `SLTI`, `SLTIU`

### Memory Access
- **Load**: `LW` (Load Word)
- **Store**: `SW` (Store Word)

### Control Flow
- **Branch**: `BEQ` (Branch if Equal)
- **Jump**: `JAL` (Jump and Link)

### Upper Immediate
- **U-type**: `LUI` (Load Upper Immediate)

## Getting Started

### Prerequisites

- **Icarus Verilog** (iverilog): For compilation
- **VVP**: Verilog simulation runtime
- **Python 3**: For the compilation helper script

Install on Ubuntu/Debian:
```bash
sudo apt-get install iverilog python3
```

## Using compiler_helper.py

The `compiler_helper.py` script automates module compilation and testing.

**Basic usage:**
```bash
./compiler_helper.py Module_name    # Test specific module
./compiler_helper.py <module_name>  # Compile and test a module
./compiler_helper.py --all          # Run all tests
./compiler_helper.py -h             # Show all options
```

## Manual Testing

```bash
cd testbench
iverilog -I ../src -o alu_test ALU_tb.v
vvp alu_test
gtkwave ALU_tb.vcd  # View waveform
```

## CPU Architecture

The single-cycle CPU follows a classic datapath design with some key enhancements:

### Overall Architecture

![CPU Top-Level Design](assets/cpu.drawio.png)
*Figure: Complete CPU architecture showing all major components and data paths*

The CPU executes instructions in the following stages:

1. **Fetch**: PC → Instruction Memory → Instruction
2. **Decode**: Instruction → Controller → Control Signals
3. **Execute**: ALU performs operation
4. **Memory**: Load/Store access Data Memory
5. **Write Back**: Result written to Register File

All operations complete in one clock cycle.

### NPC (Next Program Counter) Module

![NPC Module](assets/NPC.drawio.png)

*Figure: NPC module architecture*

A dedicated NPC module computes the next program counter value. It supports two update modes:

- **PC_NOJUMP**: Increments PC by 4 to fetch the next sequential instruction
- **PC_J_OFFSET**: Computes next PC as current address plus sign-extended immediate (for branches and jumps)

A multiplexer controlled by the `PCSrc` signal selects between these two modes.

### Two-Level Controller Design

![Controller Module](assets/Controller.drawio.png)

*Figure: Controller with two-level decoding strategy*

The controller is separated into two submodules for improved clarity:

**First-Level Decoder (Op_Decoder)**:

![Op_Decoder](assets/first.png)
*Figure: First-level decoder classifies instructions by type*

- Performs initial decoding to determine instruction category (I/S/B/U/J-type)
- Generates coarse ALU operation class
- Outputs 3-bit `ALUOp` signal for second-level decoding

**Second-Level Decoder (ALU_Decoder)**:

![ALU_Decoder](assets/second.png)
*Figure: Second-level decoder resolves exact ALU operations*

- Receives `ALUOp` signal and instruction fields
- Resolves into precise ALU control signals
- Handles function code (`funct3`, `funct7`) interpretation

**Branch Detection**: Branch equality (`BEQ`) is implemented using `ALU_XOR` - when two numbers are identical, their XOR result is zero. The `JAL` instruction is handled directly by the NPC module.

### Macro Definitions

![Define Tables](assets/define.png)
*Figure: Macro definition tables for opcodes and control signals*

The implementation extensively uses Verilog macros to improve code readability and maintainability. All opcodes, ALU operations, and control signals are defined as named constants in `define.v`.

## Reset Behavior

- **Reset Signal**: Active-low (`rst = 0` activates reset)
- **PC Reset**: Clears to `0x00000000`
- **Registers**: All cleared to zero
- **Memory**: Instruction memory loaded from `memfile.hex`

## Memory Map

- **Instruction Memory**: 0x00000000 - 0x00000FFF (4KB, 1024 words)
- **Data Memory**: 0x00000000 - 0x00000FFF (4KB, 1024 words)

Note: Instruction and data memories are separate (Harvard architecture).

## Known Limitations

**Initial PC Behavior**: The machine code must begin with a NOP instruction (00000000). On reset release, the NPC logic calculates PC+4 immediately, causing the first clock edge to skip address 0x00. This will be addressed in future versions.

## Extending the Design

To add new instructions: Update `define.v` → Modify `Op_Decoder.v` and `ALU_Decoder.v` → Implement in `ALU.v` → Add testbenches.

## License

This project is open source and available under the MIT License.

## Author

**Weiyuan Du (SinYita)**

## Acknowledgments

This project is based on the RISC-V ISA specification and standard single-cycle CPU design patterns. The implementation follows educational CPU design principles while maintaining compatibility with the RISC-V instruction encoding format.

## Additional Resources

- [RISC-V ISA Specification](https://riscv.org/technical/specifications/)
- Detailed design report with architecture diagrams available in the repository
- Comprehensive testbenches for all modules
- Automated testing framework via `compiler_helper.py`
<!-- AUTO-GENERATED:README:END -->
