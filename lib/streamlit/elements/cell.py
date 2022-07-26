# Copyright 2018-2022 Streamlit Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from typing import cast, TYPE_CHECKING
import inspect
import os

from streamlit.proto.Cell_pb2 import Cell as CellProto

from streamlit.scriptrunner.script_run_context import get_script_run_ctx

if TYPE_CHECKING:
    from streamlit.delta_generator import DeltaGenerator


class CellMixin:
    def _cell(self) -> None:
        # Must be called here, so that f_back will be the frame where the user called st.cell().
        curr_frame = inspect.currentframe()
        user_frame = curr_frame.f_back

        cell_proto = CellProto()
        cell_proto.cell_index = _get_next_cell_index()
        return self.dg._enqueue("cell", cell_proto)

    @property
    def dg(self) -> "DeltaGenerator":
        """Get our DeltaGenerator."""
        return cast("DeltaGenerator", self)


def _get_next_cell_index():
    ctx = get_script_run_ctx()
    ctx.current_cell_index += 1
    return ctx.current_cell_index